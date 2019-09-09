<?php
    include 'conn.php';
    $ipage = isset($_REQUEST['ipage'])?$_REQUEST['ipage']:'';
    $pagetotal = isset($_REQUEST['pagetotal'])?$_REQUEST['pagetotal']:'';
    $sqlname = isset($_REQUEST['sqlname'])?$_REQUEST['sqlname']:'';
    $pro_id = isset($_REQUEST['pro_id'])?$_REQUEST['pro_id']:'';
    $order_id = isset($_REQUEST['order_id'])?$_REQUEST['order_id']:'';
    $shop_num = isset($_REQUEST['shop_num'])?$_REQUEST['shop_num']:'';
    if($sqlname == 'getlist'){
        $sql = "SELECT * FROM shoppingcar limit $ipage,$pagetotal";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE); 
    }else if($sqlname == 'getshop_inf'){
        $sql = "SELECT * FROM jianke_pro where pro_id = $pro_id";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE); 
    }else if($sqlname == 'getpage'){
        $sql = "SELECT * FROM shoppingcar";
        $res = $conn->query($sql);
        echo $res->num_rows;
    }else if($sqlname == 'delshop'){
        $sql = "DELETE from shoppingcar where order_id = $order_id";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
    }else if($sqlname == 'saveinf'){
        $sql = "UPDATE shoppingcar set shoppro_num = $shop_num where order_id = $order_id";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
        // echo $shop_num,$order_id;
    }
?>