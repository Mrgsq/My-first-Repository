<?php
    include 'conn.php';
    $nowpage = isset($_REQUEST['nowpage'])?$_REQUEST['nowpage']:0;
    $page_pro = isset($_REQUEST['page_pro'])?$_REQUEST['page_pro']:16;//获取每页面显示条数
    $name = isset($_REQUEST['name'])?$_REQUEST['name']:'';
    $min = isset($_REQUEST['min'])?$_REQUEST['min']:'';
    $max = isset($_REQUEST['max'])?$_REQUEST['max']:'';
    
    if($name == 'init'){
         $sql = "SELECT * FROM jianke_pro limit $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);//执行语句 结果集
        //传给前端
    } else if($name == 'priceSearch'){
        $sql = "SELECT * FROM jianke_pro where pro_nowprice between $min and $max limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
        // echo json_encode($data,JSON_UNESCAPED_UNICODE);
    }else if($name == 'Upsort'){
        $sql = "SELECT * FROM jianke_pro order by pro_nowprice asc limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
    }else if($name == 'Downsort'){
        $sql = "SELECT * FROM jianke_pro order by pro_nowprice desc limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
    }else if($name == 'man_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%man%' limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
    }else if($name == 'woman_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%woman%' limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
    }else if($name == 'child_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%child%' limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
    }else if($name == 'old_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%old%' limit  $nowpage,$page_pro";
        $res = $conn->query($sql);
        $data = $res->fetch_all(MYSQLI_ASSOC);
    }
    
  echo json_encode($data,JSON_UNESCAPED_UNICODE);//防止乱码     
  

    $conn->set_charset('utf8');
    $res->close();
    $conn->close();
?>