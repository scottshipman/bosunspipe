<?php
$curr = getcwd();
$substring = '/src/modules';
if (substr($curr,-strlen($substring))===$substring) $curr = substr($curr, 0, strlen($curr)-strlen($substring));
$directory = $curr . "/assets/images/backgrounds/";
$contents = scandir($directory);
$scanned_directory = array_diff($contents, array('..', '.'));
$images = array_values($scanned_directory);
$response = json_encode($images);
echo $response;

?>