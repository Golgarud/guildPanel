<!DOCTYPE html>
<html>
<head>
	<meta charset="utf-8">
	<meta http-equiv="X-UA-Compatible" content="IE=edge">
	<title>guildPanel</title>
	<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.5.0/css/font-awesome.min.css">
	<link rel="stylesheet" href="{$dir.css}/guildPanel.css">
	{foreach $hookHead as $hookData}
		{$hookData}
	{/foreach}
</head>
<body>
{*
* {foreach $hookDebug as $hookData}
* 	{$hookData}
* {/foreach}
*}
<div id="page">
	<header id="main-header" class="header">
		<img src="{$dir.img}/logoTemp.png" id="main-logo" class="logo img-responsive" alt="logo temporaire guildPanel" />
		<h1>guildPanel</h1>
		{foreach $hookHeader as $hookData}
			{$hookData}
		{/foreach}
		<form method="get" id="auth-form" accept-charset="utf-8">
			<input class="input input-auth" requierd type="text" name="log-pseudo" value="" placeholder="pseudo" />
			<input class="input input-auth" requierd type="password" name="log-pwd" value="" placeholder="pwd" />
			<span>
				<input class="check check-auth" type="checkbox" name="log-insc" value="1" />
				M'inscrire?
			</span>
			<input class="input input-auth insc-only" type="email" name="log-email" value="" placeholder="email" />
			<input class="input input-auth insc-only" type="tel" name="log-tel" value="" placeholder="telehphon (telegram)" />

			<input class="input input-auth input-miel" type="text" name="log-miel" value="" placeholder="miel" />
			<a href="#loggin" class="btn btn-auth" title="log-submit" >
				<i class="fa fa-chevron-circle-right"></i>
			</a>
		</form><!-- #auth-form -->
	</header><!-- #main-header -->
