<?php
    include 'conn.php';
    $goodid = isset($_REQUEST['goodid'])?$_REQUEST['goodid']:'';
    $sql = "SELECT * from comment_data where goodid = $goodid";
    $res = $conn->query($sql);
    $data = $res->fetch_all(MYSQLI_ASSOC);
    echo json_encode($data,JSON_UNESCAPED_UNICODE);//防止乱码     
  

    $conn->set_charset('utf8');
    $res->close();
    $conn->close();
?>