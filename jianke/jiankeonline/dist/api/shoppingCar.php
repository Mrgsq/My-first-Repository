<?php
    include 'conn.php';
    // $sqlname = isset($_REQUEST['sqlname'])?$_REQUEST['sqlname']:'';
    // $shoppro_id = isset($_REQUEST['id'])?$_REQUEST['id']:'';//商品的id
    // $shoppro_name = isset($_REQUEST['name'])?$_REQUEST['name']:'';//商品的名称
    // $shoppro_num = isset($_REQUEST['num'])?$_REQUEST['num']:'';//商品的数量
    // $shoppro_price = isset($_REQUEST['price'])?$_REQUEST['price']:'';//商品的价格
    // $shoppro_img = isset($_REQUEST['img'])?$_REQUEST['img']:'';//商品的图片
    // // echo $name;
    // if($sqlname == 'saveShopping'){
    //     $sql = "INSERT INTO shoppingcar (shoppro_id,shoppro_img,shoppro_name,shoppro_num,shoppro_price) values ($shoppro_id,'$shoppro_img','$shoppro_name',$shoppro_num,$shoppro_price)";
    //     $res = $conn->query($sql);
    //     if($res){
    //         echo 'yes';
    //     }else{
    //         echo 'no';
    //     }
    // }else if($sqlname == 'getShopping'){
    //     $sql = "SELECT * FROM shoppingcar";
    //     $res = $conn->query($sql);
    //     $data = $res->fetch_all(MYSQLI_ASSOC);
    //     echo json_encode($data,JSON_UNESCAPED_UNICODE);//防止乱码  
    // }
    $sqlname = isset($_REQUEST['sqlname'])?$_REQUEST['sqlname']:'';
    $username = isset($_REQUEST['username'])?$_REQUEST['username']:'';
    $shoppro_num = isset($_REQUEST['shoppro_num'])?$_REQUEST['shoppro_num']:'';
    $shoppro_id = isset($_REQUEST['shoppro_id'])?$_REQUEST['shoppro_id']:'';
    $num = isset($_REQUEST['num'])?$_REQUEST['num']:'';
    if($sqlname == 'addCar'){
        $sql = "INSERT INTO shoppingcar (username,shoppro_num,shoppro_id) values('$username',$shoppro_num,$shoppro_id)";
        $res = $conn->query($sql);
            if($res){
                echo 'yes';
            }else{
                echo 'no';
            }   
    }else if($sqlname == 'getCar'){
        $sql = "SELECT * FROM shoppingcar where username = '$username'";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);//防止乱码  
    }else if($sqlname == 'setNum'){
        $sql = "UPDATE shoppingcar set shoppro_num = $num where shoppro_id = $shoppro_id";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
        // echo $sqlname,$num,$shoppro_id;
    }else if($sqlname == 'remove_pro'){
        $sql = "DELETE from shoppingcar where shoppro_id = $shoppro_id";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
    }
    
?>