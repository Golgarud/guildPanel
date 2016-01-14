<?php
require_once("config_root.php");
require_once(SMARTY_DIR . '/Smarty.class.php');

function minify_html($tpl_output, Smarty_Internal_Template $template)
{
	$tpl_output = preg_replace('![\t ]*[\r\n]+[\t ]*!', '', $tpl_output);
	return $tpl_output;
}

$smarty = new Smarty();
$smarty->setPluginsDir(SMARTY_PLUGIN);
$smarty->cache_dir = CACHE_SMARTY_DIR;
$smarty->template_dir = TEMPLATE_DIR;
$smarty->compile_dir = CACHE_SMARTY_COMPILE;
$smarty->config_dir = CONFIG_DIR;

if ( COMPRESSED_FILES_MOD )
{
	$smarty->registerFilter("output", "minify_html");
}
$configRoot = array(
	"root_url"		=>	ROOT_URL,
	"root"			=>	ROOT_DIR,
	"config"		=>	CONFIG_DIR,
	"class"			=>	CLASS_DIR,
	"smarty"		=>	SMARTY_DIR,
	"smarty_sysplugins"	=>	SMARTY_SYSPLUGINS_DIR,
	"smary_plugin"	=>	SMARTY_PLUGIN,
	"cache"		=>	CACHE_DIR,
	"cache_smarty"	=>	CACHE_SMARTY_DIR,
	"cache_smarty_c"	=>	CACHE_SMARTY_COMPILE,
	"template"		=>	TEMPLATE_DIR,
	"img"			=>	IMG_DIR,
	"js"			=>	JS_DIR,
	"css"			=>	CSS_DIR,
	"adm"			=>	ADM_DIR
);

$configUrl = array(
	"root_url"		=>	ROOT_URL,
	"root"			=>	ROOT_URL,
	"config"		=>	ROOT_URL . CONFIG_DIR,
	"class"			=>	ROOT_URL . CLASS_DIR,
	"smarty"		=>	ROOT_URL . SMARTY_DIR,
	"smarty_sysplugins"	=>	ROOT_URL . SMARTY_SYSPLUGINS_DIR,
	"smary_plugin"	=>	ROOT_URL . SMARTY_PLUGIN,
	"cache"		=>	ROOT_URL . CACHE_DIR,
	"cache_smarty"	=>	ROOT_URL . CACHE_SMARTY_DIR,
	"cache_smarty_c"	=>	ROOT_URL . CACHE_SMARTY_COMPILE,
	"template"		=>	ROOT_URL . TEMPLATE_DIR,
	"img"			=>	ROOT_URL . IMG_DIR,
	"js"			=>	ROOT_URL . JS_DIR,
	"css"			=>	ROOT_URL . CSS_DIR,
	"adm"			=>	ROOT_URL . ADM_DIR
);

$configMod = array(
	"dev"			=>	DEV_MOD,
	"compressed_files"	=>	COMPRESSED_FILES_MOD
);

$smarty->assign("url", $configUrl);
$smarty->assign("dir", $configRoot);
$smarty->assign("mod", $configMod);
?>
