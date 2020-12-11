<?php

$str = implode(',', $_POST) ."\n";

$handle = fopen("figure.csv", "w");

fwrite($handle, $str);

fclose($handle);

echo json_encode("");