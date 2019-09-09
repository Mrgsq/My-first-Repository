<?php

    include 'conn.php';
    $tel = isset($_REQUEST['tel'])?$_REQUEST['tel']:"";//电话号码
    $username = isset($_REQUEST['username'])?$_REQUEST['username']:'';//手机号
    $password = isset($_REQUEST['password'])?$_REQUEST['password']:"";//密码
    $name = isset($_REQUEST['name'])?$_REQUEST['name']:"";
    if($name == 'reg'){
        $sql = "INSERT INTO logincheck (phonenum,password,username) VALUES ('$tel','$password','$username')";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
    }else if($name == 'checkusername'){
        $sql = "SELECT * FROM logincheck where phonenum = $tel";
        $res = $conn->query($sql);
        // echo $res;
        if($res->num_rows){
            echo 'yes';
        }else{
            echo 'no';
        }
    }else if($name == 'getUsername'){
        $sql = "SELECT * FROM logincheck where phonenum = '$tel'";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }
     
    // echo $tel;
    

    
?>