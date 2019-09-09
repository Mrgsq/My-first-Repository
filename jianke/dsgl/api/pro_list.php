<?php
    include 'conn.php';
    $sqlname = isset($_REQUEST['sqlname'])?$_REQUEST['sqlname']:"";
    $pro_id = isset($_REQUEST['pro_id'])?$_REQUEST['pro_id']:'';
    $ipage = isset($_REQUEST['ipage'])?$_REQUEST['ipage']:'';
    $pagetotal = isset($_REQUEST['pagetotal'])?$_REQUEST['pagetotal']:'';
    if($sqlname == 'getlist'){
        $sql = "SELECT * FROM jianke_pro limit $ipage,$pagetotal";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }else if($sqlname == 'getpage'){
        $sql = 'SELECT * FROM jianke_pro';
        $res = $conn->query($sql);
        echo $res->num_rows;
    }else if($sqlname == 'delPro'){
        $sql = "DELETE FROM jianke_pro where pro_id = $pro_id";
        $res = $conn->query($sql);
        if($res){
            echo 'yes';
        }else{
            echo 'no';
        }
        // echo $pro_id;
    }


?>