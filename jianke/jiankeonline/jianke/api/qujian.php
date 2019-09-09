<?php
    include 'conn.php';
    $nowpage = isset($_REQUEST['nowpage'])?$_REQUEST['nowpage']:0;
    $page_pro = isset($_REQUEST['page_pro'])?$_REQUEST['page_pro']:16;
    $min = isset($_REQUEST['min'])?$_REQUEST['min']:'';
    $max = isset($_REQUEST['max'])?$_REQUEST['max']:'';
    $sql = "SELECT * FROM jianke_pro where pro_nowprice between $min and $max limit  $nowpage,$page_pro";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);
?>