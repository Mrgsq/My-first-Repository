<?php
    include 'conn.php';
    $username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
    $password = isset($_REQUEST['password'])?$_REQUEST['password']:'';
    // $password2 = isset($_REQUEST['pswrepeat'])?$_REQUEST['pswrepeat']:'';

    $check = isset($_REQUEST['check'])?$_REQUEST['check']:'';

    if($check == 'checkuser'){
         $sql = "SELECT * FROM admindata where username = '$username' and password = '$password'";
          $res = $conn->query($sql);
            if($res->num_rows){
                echo 'yes';
            }else{
                echo 'no';
            }
        // echo $username,$password;
    }else if($check == 'updatapsw'){
        $sql = "UPDATE admindata SET password='$password' where username = '$username'";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
    }
   
    // if()
   
    
?>