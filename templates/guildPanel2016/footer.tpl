
	<footer id="main-footer" class="footer">
		{foreach $hookFooter as $hookData}
			{$hookData}
		{/foreach}
	</footer>
</div><!-- #page end -->
<script src="https://code.jquery.com/jquery-2.1.4.min.js" type="text/javascript" charset="utf-8"></script>
<script src="{$dir.js}/jquery_2_1_4.js" type="text/javascript" charset="utf-8"></script>

<script src="{$dir.js}/packery.pkgd.min.js" type="text/javascript" charset="utf-8"></script>
<script src="{$dir.js}/draggabilly.pkgd.min.js" type="text/javascript" charset="utf-8"></script>
<script src="{$dir.js}/jquery.gridster.min.js" type="text/javascript" charset="utf-8"></script>
<script src="{$dir.js}/board.js" type="text/javascript" charset="utf-8"></script>

<script src="{$dir.js}/hashchange.js" type="text/javascript" charset="utf-8"></script>
<script src="{$dir.js}/signin.js" type="text/javascript" charset="utf-8"></script>
{foreach $hookFoot as $hookData}
	{$hookData}
{/foreach}
</body>
</html>
