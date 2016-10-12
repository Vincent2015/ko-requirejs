<!DOCTYPE html>
<html>
<head>
    <link rel="stylesheet" href="${ctx}/css/ui-new/main.common.css">
    <link href="${ctx}/css/detail.css" rel="stylesheet"/>
    <link href="${ctx}/css/common.css" rel="stylesheet"/>
    <script type="text/javascript" src="${ctx}/js/qrcode.js"></script>
	<script type="text/javascript" src="${ctx}/js/share.js"></script>
</head>
<body>
<div id="root-nav">
    <div class="w">
        <div class="breadcrumb">
            <strong><span clstag="shangpin|keycount|product|mbNav-1">${model.catetory}</span></strong>
            <span>&nbsp;&gt;&nbsp;
                <span clstag="shangpin|keycount|product|mbNav-2">${model.brandName}</span>&nbsp;&gt;&nbsp;
            </span>
            <span>${model.title}</span></span>
        </div>
    </div>
</div>
<!--/ /widget/detail-nav/detail-nav.vm -->

<!--  /widget/detail-select/detail-select.vm -->
<div id="p-box">
    <div class="w">
        <div id="seo-banner" class="m m2 hide"></div>
    </div>
    <div class="w">
        <div id="search-result" class="m m2 hide" clstag="shangpin|keycount|product|exrs"></div>
    </div>

    <div class="w">
        <div id="product-intro" class="m-item-grid clearfix">
            <div id="preview" clstag="shangpin|keycount|product|mainpicarea_1">
                <div id="spec-n1" class="jqzoom"
                     clstag="shangpin|keycount|product|mainpic_1">
                    <img src="${ctx + "/" +model.imgLarge!""}" width="350" height="350" alt="${model.title}"
                         style="display: block;">
                </div>
                <div id="short-share">
                    <div class="fl"><span>商品编号：</span><span>${model.id}</span></div>
                    <a id="choose-btn-coll" class="choose-btn-coll" href="#none" data-id="1016410"
                       clstag="shangpin|keycount|product|guanzhushangpin_1"><b></b><em id="">关注商品</em></a>
                    <a id="share-list" class="share-list" href="#none" clstag="shangpin|keycount|product|share_1"
                     onclick="document.getElementById('light').style.display='block';document.getElementById('fade').style.display='block'">
                        <b></b><em>分享</em>
                    </a>
                </div>
            </div>

            <div class="m-item-inner" clstag="shangpin|keycount|product|zhushujuqu_1">
                <div id="itemInfo">
                    <div id="name">
                        <h1>${model.title}</h1>

                        <div id="p-ad" class="p-ad J-ad-1016410">
                            【白条分期】0首付！12期免息！店铺更享全场满减！
                        </div>
                        <div id="p-ad-phone" class="p-ad"></div>
                    </div>
                    <div id="compare">
                        <a href="#none" id="comp_1016410" data-sku="1016410" class="J_contrast btn-compare"
                           clstag="shangpin|keycount|product|jiaruduibi"><span>对比</span></a>
                    </div>
                    <div id="summary">
                        <div id="comment-count" clstag="shangpin|keycount|product|pingjiabtn_1">
                            <p class="comment">累计评价</p>
                            <a class="count J-comm-1016410" href="#comment">21790</a>
                        </div>
                        <div id="summary-price">
                            <div class="dt">价格：</div>
                            <div class="dd">
                                <strong class="p-price" id="jd-price">￥${model.goodsPrice}</strong>
                                <a data-type="1" data-sku="1016410" id="notice-downp" class="J-notify-1" href="#none"
                                   clstag="shangpin|keycount|product|jiangjia_1">(降价通知)</a>
                            </div>
                        </div>
                        <div id="J-summary-top" class="summary-top" clstag="shangpin|keycount|product|cuxiao_1">
                            <div id="summary-promotion" class="hide" style="display: none;">
                                <div class="dt">促销信息：</div>
                                <div class="dd J-prom-wrap p-promotions-wrap">
                                    <div class="p-promotions">
                                        <ins id="prom-mbuy"></ins>
                                        <ins id="prom-gift" clstag="shangpin|keycount|product|zengpin_1"></ins>
                                        <ins id="prom"></ins>
                                        <ins id="prom-phone"></ins>
                                        <ins id="prom-phone-jjg"></ins>
                                        <ins id="prom-tips"></ins>
                                        <ins id="prom-quan"></ins>
                                        <div class="J-prom-more view-all-promotions" style="visibility: hidden;">
                                            <span class="prom-sum">共<em
                                                    class="prom-number J-prom-count">0</em>项促销</span>
                                            <a href="#none" class="view-link"><i class="i-arrow"></i></a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div id="summary-support" class="li hide" clstag="shangpin|keycount|product|zhichi_huishou_681">
                            <div class="dt">支　　持：</div>
                            <div class="dd">
                                <ul class="choose-support lh">
                                </ul>
                            </div>
                        </div>
                        <div id="summary-stock" clstag="shangpin|keycount|product|quyuxuanze_1">
                            <div class="dt">配 送 至：</div>
                            <div class="dd clearfix">
                                <div id="store-selector" class="">
                                    <div class="text">
                                        <div title="北京朝阳区三环以内">北京朝阳区三环以内</div>
                                        <b></b></div>
                                    <div class="content">
                                        <div data-widget="tabs" class="m JD-stock" id="JD-stock">
                                            <div class="mt">
                                                <ul class="tab">
                                                    <li data-index="0" data-widget="tab-item" class=""><a href="#none"
                                                                                                          class=""><em>北京</em><i></i></a>
                                                    </li>
                                                    <li data-index="1" data-widget="tab-item" style="" class=""><a
                                                            href="#none" class="" title="朝阳区"><em>朝阳区</em><i></i></a>
                                                    </li>
                                                    <li data-index="2" data-widget="tab-item"
                                                        style="display: list-item;" class="curr"><a href="#none"
                                                                                                    class="hover"
                                                                                                    title="三环以内"><em>三环以内</em><i></i></a>
                                                    </li>
                                                    <li data-index="3" data-widget="tab-item" style="display: none;"><a
                                                            href="#none" class=""><em>请选择</em><i></i></a></li>
                                                </ul>
                                                <div class="stock-line"></div>
                                            </div>
                                            <div class="mc" data-area="0" data-widget="tab-content"
                                                 id="stock_province_item" style="display: none;">
                                                <ul class="area-list">
                                                    <li><a href="#none" data-value="1">北京</a></li>
                                                    <li><a href="#none" data-value="2">上海</a></li>
                                                    <li><a href="#none" data-value="3">天津</a></li>
                                                    <li><a href="#none" data-value="4">重庆</a></li>
                                                    <li><a href="#none" data-value="5">河北</a></li>
                                                    <li><a href="#none" data-value="6">山西</a></li>
                                                    <li><a href="#none" data-value="7">河南</a></li>
                                                    <li><a href="#none" data-value="8">辽宁</a></li>
                                                    <li><a href="#none" data-value="9">吉林</a></li>
                                                    <li><a href="#none" data-value="10">黑龙江</a></li>
                                                    <li><a href="#none" data-value="11">内蒙古</a></li>
                                                    <li><a href="#none" data-value="12">江苏</a></li>
                                                    <li><a href="#none" data-value="13">山东</a></li>
                                                    <li><a href="#none" data-value="14">安徽</a></li>
                                                    <li><a href="#none" data-value="15">浙江</a></li>
                                                    <li><a href="#none" data-value="16">福建</a></li>
                                                    <li><a href="#none" data-value="17">湖北</a></li>
                                                    <li><a href="#none" data-value="18">湖南</a></li>
                                                    <li><a href="#none" data-value="19">广东</a></li>
                                                    <li><a href="#none" data-value="20">广西</a></li>
                                                    <li><a href="#none" data-value="21">江西</a></li>
                                                    <li><a href="#none" data-value="22">四川</a></li>
                                                    <li><a href="#none" data-value="23">海南</a></li>
                                                    <li><a href="#none" data-value="24">贵州</a></li>
                                                    <li><a href="#none" data-value="25">云南</a></li>
                                                    <li><a href="#none" data-value="26">西藏</a></li>
                                                    <li><a href="#none" data-value="27">陕西</a></li>
                                                    <li><a href="#none" data-value="28">甘肃</a></li>
                                                    <li><a href="#none" data-value="29">青海</a></li>
                                                    <li><a href="#none" data-value="30">宁夏</a></li>
                                                    <li><a href="#none" data-value="31">新疆</a></li>
                                                    <li><a href="#none" data-value="32">台湾</a></li>
                                                    <li><a href="#none" data-value="42">香港</a></li>
                                                    <li><a href="#none" data-value="43">澳门</a></li>
                                                    <li><a href="#none" data-value="84">钓鱼岛</a></li>
                                                </ul>
                                            </div>
                                            <div class="mc" data-area="1" data-widget="tab-content" id="stock_city_item"
                                                 style="display: none;">
                                                <ul class="area-list">
                                                    <li><a href="#none" data-value="72">朝阳区</a></li>
                                                    <li><a href="#none" data-value="2800">海淀区</a></li>
                                                    <li><a href="#none" data-value="2801">西城区</a></li>
                                                    <li><a href="#none" data-value="2802">东城区</a></li>
                                                    <li><a href="#none" data-value="2803">崇文区</a></li>
                                                    <li><a href="#none" data-value="2804">宣武区</a></li>
                                                    <li><a href="#none" data-value="2805">丰台区</a></li>
                                                    <li><a href="#none" data-value="2806">石景山区</a></li>
                                                    <li><a href="#none" data-value="2807">门头沟</a></li>
                                                    <li><a href="#none" data-value="2808">房山区</a></li>
                                                    <li><a href="#none" data-value="2809">通州区</a></li>
                                                    <li><a href="#none" data-value="2810">大兴区</a></li>
                                                    <li><a href="#none" data-value="2812">顺义区</a></li>
                                                    <li><a href="#none" data-value="2814">怀柔区</a></li>
                                                    <li><a href="#none" data-value="2816">密云区</a></li>
                                                    <li><a href="#none" data-value="2901">昌平区</a></li>
                                                    <li><a href="#none" data-value="2953">平谷区</a></li>
                                                    <li><a href="#none" data-value="3065">延庆县</a></li>
                                                </ul>
                                            </div>
                                            <div class="mc" data-area="2" data-widget="tab-content" id="stock_area_item"
                                                 style="display: block;">
                                                <ul class="area-list">
                                                    <li><a href="#none" data-value="2799">三环以内</a></li>
                                                    <li><a href="#none" data-value="4137">管庄</a></li>
                                                    <li><a href="#none" data-value="4139">北苑</a></li>
                                                    <li><a href="#none" data-value="4211">定福庄</a></li>
                                                    <li class="long-area"><a href="#none" data-value="2819">三环到四环之间</a>
                                                    </li>
                                                    <li class="long-area"><a href="#none" data-value="2839">四环到五环之间</a>
                                                    </li>
                                                    <li class="long-area"><a href="#none" data-value="2840">五环到六环之间</a>
                                                    </li>
                                                </ul>
                                            </div>
                                            <div class="mc" data-area="3" data-widget="tab-content" id="stock_town_item"
                                                 style="display: none;"></div>
                                        </div>
                                        <span class="clr"></span>
                                    </div>
                                    <div class="close" onclick="$('#store-selector').removeClass('hover')"></div>
                                </div>
                                <div id="store-prompt"><strong>有货</strong>，支持&nbsp;<a
                                        href="#none"
                                        title="钻石会员自营订单满59元（含）免运费， 其他会员自营订单满79元（含）免运费， 不足金额订单收取5元/单运费（偏远地区额外收取10元/件）。">79免运费</a>&nbsp;&nbsp;|&nbsp;&nbsp;<a
                                        href="#none"
                                        title="支持送货上门后再收款，支持现金、POS机刷卡等方式">货到付款</a><span class="charges"></span></div>
                            </div>
                            <span class="clr"></span>
                        </div>
                        <div id="summary-service" clstag="shangpin|keycount|product|fuwu_1">
                            <div class="dt">服　　务：</div>
                            <div class="dd">由 宜美惠 发货并提供售后服务。23:00前完成下单,预计<b>明天(09月02日)</b>送达,世锦赛、大阅兵期间部分地区时效可能会受影响</div>
                        </div>
                    </div>
                    <div id="choose" class="clearfix p-choose-wrap" clstag="shangpin|keycount|product|choose">
                        <div id="choose-type"></div>
                        <div id="choose-additional" class="li choose-additional hide"></div>
                        <div id="choose-suit" class="li">
                            <div class="dt">选择套装：</div>
                            <div class="dd" clstag="shangpin|keycount|product|xuanzetaozhuang_681">
                                <div class="item selected"><b></b><a style="cursor: pointer;" href="#none">1件</a></div>
                                <div class="item"><b></b><a style="cursor: pointer;"
                                                            href="#none"
                                                            title="套装2件">套装2件</a>
                                </div>
                                <div class="item"><b></b><a style="cursor: pointer;"
                                                            href="#none"
                                                            title="套装2件">套装2件</a>
                                </div>
                                <div class="item"><b></b><a style="cursor: pointer;"
                                                            href="#none"
                                                            title="套装2件">套装2件</a>
                                </div>
                                <div class="item"><b></b><a style="cursor: pointer;"
                                                            href="#none"
                                                            title="套装2件">套装2件</a>
                                </div>
                                <div class="item"><b></b><a style="cursor: pointer;"
                                                            href="#none"
                                                            title="套装2件">套装2件</a>
                                </div>
                                <div class="item"><b></b><a style="cursor: pointer;"
                                                            href="#none"
                                                            title="套装2件">套装2件</a>
                                </div>
                            </div>
                        </div>
                        <div id="choose-result"></div>
                        <div id="choose-baitiao" class="li p-choose choose-baitiao hide" style="display: block;">
                            <div class="dt">白条分期：</div>
                            <div class="dd">
                                <div class="item" clstag="shangpin|keycount|product|mianxi" data-type="1"><b></b><a
                                        href="#none">30 天免息</a></div>
                                <div class="item" clstag="shangpin|keycount|product|fenqi" data-type="24"><b></b><a
                                        href="#none">每月￥<span class="J-bt-fq">24.96</span>元起</a></div>
                            </div>
                        </div>
                        <div id="choose-btns" class="li">
                            <div class="choose-amount fl " clstag="shangpin|keycount|product|goumaishuliang_1">
                                <div class="wrap-input">
                                    <a class="btn-reduce" href="javascript:;">-</a>
                                    <a class="btn-add" href="javascript:;">+</a>
                                    <input class="text" id="buy-num" value="1" onkeyup="setAmount.modify('#buy-num');">
                                </div>
                            </div>
                            <div class="btn hide" id="choose-btn-gift">
                                <a href="#"
                                   class="btn-gift"><b></b>选作礼物购买</a>
                            </div>
                            <div class="btn" id="choose-btn-append" clstag="shangpin|keycount|product|initcarturl_1">
                                <a class="btn-append " id="InitCartUrl"
                                   href="#none" onclick="addToCart(${model.id?c});">加入购物车<b></b></a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

<div id="iteminfocontainer">


</div>

<!--  /widget/footer/footer.vm -->
<!-- footer 2014-6-9 update -->
<div class="w">
    <div id="service-2013">
        <dl class="fore1">
            <dt><b></b><strong>购物指南</strong></dt>
            <dd>
                <div><a href="#"  rel="nofollow">购物流程</a></div>
                <div><a href="#"  rel="nofollow">会员介绍</a></div>
                <div><a href="#"  rel="nofollow">团购/机票</a></div>
                <div><a href="#"  rel="nofollow">常见问题</a></div>
                <div><a href="#"  rel="nofollow">大家电</a></div>
                <div><a href="#"  rel="nofollow">联系客服</a></div>
            </dd>
        </dl>
        <dl class="fore2">
            <dt><b></b><strong>配送方式</strong></dt>
            <dd>
                <div><a href="#"  rel="nofollow">上门自提</a></div>
                <div><a href="#"  rel="nofollow">211限时达</a></div>
                <div><a href="#"  rel="nofollow">配送服务查询</a>
                </div>
                <div><a href="#" 
                        rel="nofollow">配送费收取标准</a></div>
                <div><a href="#"  rel="nofollow">如何送礼</a>
                </div>
                <div><a href="#"  rel="nofollow">海外配送</a></div>
            </dd>
        </dl>
        <dl class="fore3">
            <dt><b></b><strong>支付方式</strong></dt>
            <dd>
                <div><a href="#"  rel="nofollow">货到付款</a></div>
                <div><a href="#"  rel="nofollow">在线支付</a></div>
                <div><a href="#"  rel="nofollow">分期付款</a></div>
                <div><a href="#"  rel="nofollow">邮局汇款</a></div>
                <div><a href="#"  rel="nofollow">公司转账</a></div>
            </dd>
        </dl>
        <dl class="fore4">
            <dt><b></b><strong>售后服务</strong></dt>
            <dd>
                <div><a href="#"  rel="nofollow">售后政策</a></div>
                <div><a href="#"  rel="nofollow">价格保护</a></div>
                <div><a href="#"  rel="nofollow">退款说明</a></div>
                <div><a href="#"  rel="nofollow">返修/退换货</a></div>
                <div><a href="#"  rel="nofollow">取消订单</a></div>
            </dd>
        </dl>
        <dl class="fore5">
            <dt><b></b><strong>特色服务</strong></dt>
            <dd>
                <div><a href="#" >夺宝岛</a></div>
                <div><a href="#" >DIY装机</a></div>
                <div><a href="#"  rel="nofollow">延保服务</a></div>
                <div><a href="#"  rel="nofollow">京东卡</a></div>
                <div><a href="#"  rel="nofollow">节能补贴</a></div>
            </dd>
        </dl>
        <span class="clr"></span>
    </div>
</div>

<!--分享层 -->
<div id="light" style="display: none; position: absolute; top: 100px; left: 30%; width: 40%; height: 350px; padding: 16px; border: 5px solid gray; background-color: white; z-index: 1002; overflow: auto;">
	分享到   :
	<a href="javascript:void(0)" onclick="document.getElementById('light').style.display='none';document.getElementById('fade').style.display='none'"> 
        <img src="${ctx}/images/shareimg/x.png" border="0"  style="float:right;" alt="关闭" >
    </a>
	<ul id="bsLogoList">
		<div id="bp-qqmb" style="float:left; width:50px;margin:15px;">
			<a href="javascript:void(0)" onclick="ShareToTencent(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/qqweibo.gif" border="0" alt="腾讯微博" ></a>
			<div style="font-size:10px;" title="腾讯微博">
				腾讯微博
			</div>
		</div>
		<div id="bp-sinaminiblog" style="float:left;  width:50px;margin:15px;" >
			<a href="javascript:void(0)" onclick="ShareToSina(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/sinaweibo.gif" border="0" alt="新浪微博" ></a>
			<div style="font-size:10px;" title="新浪微博">
				新浪微博
			</div>
		</div>
		<div id="bp-qqim" style="float:left;  width:50px;margin:15px ;">
			<a href="javascript:void(0)" onclick="ShareToQQIM(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/qqim.gif" border="0" alt="QQ" ></a>
			<div style="font-size:10px;" title="QQ">
				QQ
			</div>
		</div>
		<div id="bp-qzone" style="float:left; width:50px; margin:15px;">
			<a href="javascript:void(0)" onclick="ShareToQzone(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/qzone.gif" border="0" alt="QQ空间" ></a>
			<div style="font-size:10px;" title="QQ空间">
				QQ空间
			</div>
		</div>
		
		<div id="bp-baiduhi" style="float:left;  width:50px;margin:15px;">
			<a href="javascript:void(0)" onclick="ShareToBaiduTieba(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/baiduhi.gif" border="0" alt="百度" ></a>
			<div style="font-size:10px;" title="百度贴吧">
				百度贴吧
			</div>
		</div>
		<div id="bp-douban" style="float:left;  width:50px;margin:15px;">
			<a href="javascript:void(0)" onclick="ShareToDouban(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/douban.gif" border="0" alt="豆瓣网" ></a>
			<div style="font-size:10px;" title="豆瓣网">
				豆瓣网
			</div>
		</div>
		<div id="bp-youdao" style="float:left;  width:50px;margin:15px;">
			<a href="javascript:void(0)" onclick="ShareYoudao(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/youdaonote.gif" border="0" alt="有道" ></a>
			<div style="font-size:10px;" title="Youdao">
				有道
			</div>
		</div>
		<div id="bp-kaixin001" style="float:left;  width:50px;margin:15px;">
			<a href="javascript:void(0)" onclick="ShareToKaixin(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/kaixin.gif" border="0" alt="开心网" ></a>
			<div style="font-size:10px;" title="开心网">
				开心网
			</div>
		</div>
		<div id="bp-sohuminiblog" style="float:left;  width:50px;margin:15px;">
			<a href="javascript:void(0)" onclick="ShareToSohu(document.title,location.href,document.title);" class="tmblog"><img src="${ctx}/images/shareimg/sohuminiblog.gif" border="0" alt="搜狐微博" ></a>
			<div style="font-size:10px;" title="搜狐微博">
				搜狐微博
			</div>
		</div>
		<div id="bp-wechart" style="float: left; width: 50px; margin: 15px;">
			<a href="javascript:void(0)" onclick="ShareToWeChart();" class='tmblog'>
				<img src="${ctx}/images/shareimg/wechart.png" border="0" alt="微信分享">
			</a>
			<div style="font-size: 10px;" title="微信分享">微信</div>
		</div>
	</ul>
</div>
<!-- 二维码展示层 -->
<div id="qrcode" style="display: none; position: absolute; top: 300px; left: 40%;  padding: 16px; border: 2px solid gray; background-color: white; z-index: 1003; overflow: auto;">
	<a href="javascript:void(0)" onclick="document.getElementById('qrcode').style.display='none';document.getElementById('fade').style.display='none'">
		<img src="${ctx}/images/shareimg/x.png" border="0" style="float: right;"alt="关闭">
	</a>
</div>
<!--end分享层 -->
<div id="fade" style="display: none; position: absolute; top: 0%; left: 0%; width: 100%; height: 100%; background-color: black; z-index: 1001; -moz-opacity: 0.5; opacity: .60; filter: alpha(opacity=50);"></div>
<script src="${ctx}/js/cart.js" type="text/javascript"></script>
</body>
