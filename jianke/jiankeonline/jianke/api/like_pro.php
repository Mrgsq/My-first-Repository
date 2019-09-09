<?php
    include 'conn.php';
    $str = isset($_REQUEST['str'])?$_REQUEST['str']:'';
    $sql = "SELECT * FROM jianke_pro where sort='$str' limit 0,10";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//防止乱码     
  

    $conn->set_charset('utf8');
    $res->close();
    $conn->close();

?>