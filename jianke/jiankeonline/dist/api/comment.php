<?php
    include 'conn.php';
    $goodid = isset($_REQUEST['goodid'])?$_REQUEST['goodid']:'';
    $username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
    $comment = isset($_REQUEST['comment'])?$_REQUEST['comment']:'';
    $time = isset($_REQUEST['time'])?$_REQUEST['time']:'';
    // echo $goodid,$username,$comment,$time;
    $sql = "INSERT INTO comment_data (goodid,username,comment,time) values($goodid,'$username','$comment','$time')";
    $res = $conn->query($sql);

    if($res){
        echo 'yes';
    }else{
        echo 'no';
    }
    // $conn->set_charset('utf8');
    // $res->close();
    // $conn->close();
?>