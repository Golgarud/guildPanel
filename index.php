<?php
require_once("./config/config_include.php");
$db = null;

$ModulesController = new ModulesController( $smarty, $db );
$ModulesController->instanceModuleList();
$hookData = $ModulesController->catchAllHook();

$FrontController = new FrontController(  $smarty, $db, $templateList, $hookData );
$FrontController->catchGlobData();
$FrontController->displayTpl();


?>
