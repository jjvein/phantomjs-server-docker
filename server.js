//此js用来获取网页源码
var system=require('system');  //get args
var args=system.args;
if (args.length ===2) {
    var port=Number(args[1]);
}
else {
    var port=8080;
}
var webserver = require('webserver');
var server = webserver.create()
var service = server.listen(port, function(request, response) {
    try {
        var postRaw=request.postRaw;
        console.log(postRaw)
        var url =postRaw.split("=")[1];
        url=decodeURIComponent(url);
        // 创建page
        var webPage = require('webpage');
        var page = webPage.create();

        page.settings = {
            resourceTimeout: 20000,
            javascriptEnabled: true,
            loadImages: false,
            webSecurityEnabled: false,
        }
        // phantomjs错误捕捉
        phantom.onError = function(msg, trace) {
            console.log("[Warning]This is phantom.onError");
            var msgStack = ['PHANTOM ERROR: ' + msg];
            if (trace && trace.length) {
                msgStack.push('TRACE:');
                trace.forEach(function(t) {
                    msgStack.push(' -> ' + (t.file || t.sourceURL) + ': ' + t.line + (t.function ? ' (in function ' + t.function +')' : ''));
                });
            }
            console.error(msgStack.join('\n'));
            phantom.exit(1);
        };
        page.onResourceError = function(resourceError) {
            console.log("R.id: " + resourceError.id
                + ', url:' + resourceError.url
                + ', errorCode: ' + resourceError.errorCode
                + ', errorString: ' + resourceError.errorString)
        };
        // 打开网页，获取源码
        page.open(url, {}, function (status) {
            console.log('Target_url is ' + url + ", status : " + status);  //输出待检测的网站url
            if(status=='success'){
                console.log('success')
            }
            else
            {
                var body="";
                var current_url="";
            }
            response.status=200;
            //  response.write(body);  //返回获取到的网页源码
            response.write(current_url); //返回当前的网页url
            setTimeout(function() {
                page.close();
                response.close();
            }, 7000);
        });

        page.onLoadFinished = function(status) {
            console.log("Finished!!!!")
        }
    }
    catch(e) {
        console.log('[Error]'+e.message+'happen'+e.lineNumber+'line');
    }
});
