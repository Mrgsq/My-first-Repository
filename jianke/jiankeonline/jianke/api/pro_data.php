<?php
    include 'conn.php';
    $id = isset($_REQUEST['id'])?$_REQUEST['id']:'';
    $sql = "SELECT * FROM jianke_pro where pro_id = $id";
    $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);//执行语句 结果集

        echo json_encode($data,JSON_UNESCAPED_UNICODE);//防止乱码     
  

        $conn->set_charset('utf8');
        $res->close();
        $conn->close();
?>