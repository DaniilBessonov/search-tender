<?php
class Model
{
    public function addItemToIgnoreList($id)
    {
        Model::createConnection();
        $query = "insert into ignore_list (item_id) values ('" . $id . "')";
        return mysql_query($query);
    }

    public function removeItemFromIgnoreList($id)
    {
        Model::createConnection();
        $query = "delete from ignore_list where item_id='" . $id . "'";
        return mysql_query($query);
    }

    public function getIgnoreList()
    {
        $result = array();
        Model::createConnection();
        $query = "select item_id from ignore_list";
        $rows = mysql_query($query);
        while ($res = mysql_fetch_assoc($rows)) {
            $result[] = $res['item_id'];
        }
        return $result;
    }

    private function createConnection()
    {
        Model::createWebConnection() or Model::createLocalConnection() or die("Connection to DB failed");
    }

    private function createWebConnection()
    {
        //byethost8.com
        return mysql_connect("sql308.byethost8.com", "b8_16943261", "Optimus") and mysql_select_db("b8_16943261_tender");
    }

    private function createLocalConnection()
    {
        return mysql_connect("localhost", "root", "") and mysql_select_db("test");
    }

}