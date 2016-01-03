<?php
require_once("conff_root.php");
require_once(SMARTY_DIR . '/Smarty.class.php');

$smarty = new Smarty();
$smarty->setPluginsDir(SMARTY_PLUGIN);
$smarty->cache_dir = CACHE_SMARTY_DIR;
$smarty->template_dir = TEMPLATE_DIR;
$smarty->compile_dir = CACHE_SMARTY_COMPILE;
$smarty->config_dir = CONFF_DIR;
$conffRoot = array(
	"conff"				=> CONFF_DIR,
	"class"				=> CLASS_DIR,
	"smarty"			=> SMARTY_DIR,
	"smarty_sysplugins"		=> SMARTY_SYSPLUGINS_DIR,
	"smary_plugin"		=> SMARTY_PLUGIN,
	"cache"			=> CACHE_DIR,
	"cache_smarty"		=> CACHE_SMARTY_DIR,
	"cache_smarty_c"		=> CACHE_SMARTY_COMPILE,
	"template"			=> TEMPLATE_DIR,
	"img"				=> IMG_DIR,
	"js"				=> JS_DIR,
	"css"				=> CSS_DIR,
	"mod"				=> MOD_DIR,
	"adm"				=> ADM_DIR
);
$smarty->assign("dir", $conffRoot);
?>
