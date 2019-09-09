<?php
    include 'conn.php';
    $name = isset($_REQUEST['name'])?$_REQUEST['name']:'';
    $min = isset($_REQUEST['min'])?$_REQUEST['min']:'';//最大值
    $max = isset($_REQUEST['max'])?$_REQUEST['max']:'';//最小值
    if($name == 'init'){
        $sql = "SELECT * FROM jianke_pro";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
     
    }else if($name == 'priceSearch'){
        $sql = "SELECT * FROM jianke_pro where pro_nowprice between $min and $max";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
     
    }else if($name == 'Upsort'){
        $sql = "SELECT * FROM jianke_pro order by pro_nowprice asc";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
  
    }else if($name == 'Downsort'){
        $sql = "SELECT * FROM jianke_pro order by pro_nowprice desc";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
  
    }else if($name == 'man_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%man%'";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
    }else if($name == 'woman_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%woman%'";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
        
    }else if($name == 'child_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%child%'";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
    }else if($name == 'old_pro'){
        $sql = "SELECT * FROM jianke_pro where pro_imgUrl like '%old%'";
        $res = $conn->query($sql);
        $totalpro = $res->num_rows;
    }
   echo $totalpro; 
    
    $conn->set_charset('utf8');
    $res->close();
    $conn->close();
?>