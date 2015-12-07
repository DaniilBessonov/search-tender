<?php
include_once "Model.php";
$model = new Model();

error_reporting(E_ERROR);

$method = $_POST['method'];

if (isset($_POST['params'])) {
    $result = $model->$method(json_decode($_POST['params']));
} else {
    $result = $model->$method();
}
echo json_encode($result);
?>