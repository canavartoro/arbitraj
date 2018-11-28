<?php
require_once('MysqliDb.php');
error_reporting(E_ALL);
$action = 'adddb';
$data = array();

function action_product () {
    $res = array();

    if(!isset($_GET['asin']))
    {
        $res["id"] = 0;    
        $res["status"] = "ok";
        $res['answer'] = ''; 
        echo json_encode($res);   
        return;
    }

    $asin = $_GET['asin'];

    try 
    {
        global $db;
        $db->where("Asin", $asin);
        $users = $db->get("products");
        $res['answer'] = $users;  
        $res['status'] = true;  
        //header ("Location: index.php");
        echo json_encode($res);
    }
    catch(Exception $e) {
        echo 'Message: ' .$e->getMessage();
      }
    return;
}


$db = new Mysqlidb ('5.79.119.216', 'root', 'Aa20012001', 'arbitraj');
if ($_GET) {
    $f = "action_".$_GET['cmd'];
    if (function_exists ($f)) {
        $f();
    }
    else {
        $res["id"] = 0;    
        $res["status"] = "error";
        $res['answer'] = 'Fonction not found!'; 
        echo json_encode($res);   
        return;
    }
}
?>