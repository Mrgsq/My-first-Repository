<?php
    include 'conn.php';
    $userid = isset($_REQUEST['userid'])?$_REQUEST['userid']:'';//用户id
    $password = isset($_REQUEST['password'])?$_REQUEST['password']:'';//用户密码
    $username = isset($_REQUEST['username'])?$_REQUEST['username']:'';//用户名
    $phonenum = isset($_REQUEST['phonenum'])?$_REQUEST['phonenum']:'';//用户号码
    $sqlname = isset($_REQUEST['sqlname'])?$_REQUEST['sqlname']:''; 
    $ipage = isset($_REQUEST['ipage'])?$_REQUEST['ipage']:'';//当前页
    $pagetotal = isset($_REQUEST['pagetotal'])?$_REQUEST['pagetotal']:'';//每页显示条数
    
    if($sqlname == 'showData'){//列表显示
        $sql = "SELECT * FROM logincheck limit $ipage,$pagetotal";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE); 
    }else if($sqlname == 'getPage'){//页码显示
        $sql = "SELECT * FROM logincheck";
        $res = $conn->query($sql);
        echo $res->num_rows;
        // $data = $res->fetch_all(MYSQLI_ASSOC);
        // echo json_encode($data,JSON_UNESCAPED_UNICODE); 
    }else if($sqlname == 'delUser'){//删除用户
        $sql = "DELETE FROM logincheck where userid= $userid";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
        // echo $userid;
    }else if($sqlname == 'changeUserinf'){//更改用户信息
        $sql = "UPDATE logincheck set username='$username',password='$password',phonenum = '$phonenum' where userid = $userid";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
    }else if($sqlname == 'checkPhone'){
        $sql = "SELECT * FROM logincheck where phonenum = '$phonenum'";
        $res = $conn->query($sql);
        if($res->num_rows){
            echo 'yes';
        }else{
            echo 'no';
        }

    }else if($sqlname == 'checkUsername'){
        $sql = "SELECT * FROM logincheck where username = '$username'";
        $res = $conn->query($sql);
        if($res->num_rows){
            echo 'yes';
        }else{
            echo 'no';
        }
    }else if($sqlname == 'insertUser') {
        $sql = "INSERT INTO logincheck (username,password,phonenum) values('$username','$password','$phonenum')";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
    }
?>