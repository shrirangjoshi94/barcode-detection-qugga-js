$(function ()
{

    var App = {
        init: function ()
        {
            App.attachListeners();
        },
        attachListeners: function ()
        {
            var self = this;

            //called on image upload
            $(".chooseImageFileBtn").on("change", function (event)
            {
                drawImageOnCanvas(event);
            });

            $(".linkToStockBtn").on("click", function (event)
            {
                linkToStock();
            });


            $(".saveToNetworkBtn").on("click", function (event)
            {
                event.preventDefault();
                saveToNetworkShare();
            });

        },

        decode: function (src)
        {
            var self = this,
                    config = $.extend({}, self.state, {src: src});

            Quagga.decodeSingle(config, function (result) {});
        },

        state:
                {
                    inputStream:
                            {
                                size: 800,
                                singleChannel: false
                            },
                    locator:
                            {
                                patchSize: "medium",
                                halfSample: true
                            },
                    decoder:
                            {
                                readers: [
                                    "code_128_reader",
                                    "code_39_reader",
                                    "code_39_vin_reader",
                                ]
                            },
                    locate: false,
                    src: null
                }
    };

    App.init();

    Quagga.onProcessed(function (result)
    {

        if (result)
        {
            if (result.codeResult && result.codeResult.code)
            {
                alert("inside if");
                console.log(result.codeResult.code);
                alert(result.codeResult.code);
                
            } else
            {
                alert("unable to detect code");
            }

        }
    });

    //function to draw image on canvas
    function drawImageOnCanvas(event)
    {
        if (event.target.files && event.target.files.length)
        {
            let reader = new FileReader();

            reader.onload = function (e) {
                $('#plotImage').attr('src', e.target.result);
            }

            reader.readAsDataURL(event.target.files[0]);

            imageAcceptableCheck();
            return true;
        } else
        {
            return false;
        }
    }

    //function to get barcode value
    function linkToStock()
    {
//        $(".chooseImageFileBtn").trigger('click');

        let input = document.querySelector(".chooseImageFileBtn");
        if (checkImagePresent())
        {
            App.decode(URL.createObjectURL(input.files[0]));
        }
    }

    function checkImagePresent()
    {
        let input = document.querySelector(".chooseImageFileBtn");
        if (input.files && input.files.length)
        {
            return true;
        } else
        {
            alert("upload an image first")
            return false;
        }
    }

    function imageAcceptableCheck()
    {
        if (!/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
        {
            setTimeout(function () {
                message = "image acceptable?";
                if (!confirm(message))
                {
                    location.reload();
                }
            }, 1000);
        }
    }

    //funtion to save the captured image on server using FTP
    function saveToNetworkShare()
    {
        if (checkImagePresent())
        {
            $("#barcodeImgForm").ajaxForm({
                success: function (data) {
                    
                    
                    
                },
            }).submit();
        }
    }

});

