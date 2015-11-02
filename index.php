<?php
require_once("./conff/conff_include.php");
require_once(CLASS_DIR."/ModuleController.php");
$db = null;
$modulesController = new ModulesController( $smarty, $db );
$modulesController->instanceModuleList();
die();
$smarty->display('header.tpl');
$smarty->display('toolbar.tpl');
$smarty->display('index.tpl');
$smarty->display('footer.tpl');
?>