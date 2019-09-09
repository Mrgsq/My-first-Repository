<?php
include 'conn.php';
$tel = isset($_REQUEST['tel'])?$_REQUEST['tel']:"";
 $sql = "SELECT * FROM logincheck where phonenum = $tel";
 $res = $conn->query($sql);
 // echo $res;
 if($res->num_rows){
     echo 'yes';
 }else{
     echo 'no';
 }
?>