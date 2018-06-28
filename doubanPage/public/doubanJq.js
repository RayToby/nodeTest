var $table = $('#douban');
console.log('11111');
$.ajax({
    type: "GET",
    url: "/getDouban",
    data: {},
    dataType: "json",
    success: function(data){
        var newArray = eval('(' + data.doubanData + ')');
        newArray.forEach((item, index) => {
            var _html = `<tr>
                            <td>${item.title}</td>
                            <td>${item.rating_nums}</td>
                            <td>${item.rating_person}</td>
                            <td>${item.abstract}</td>
                            <td>${item.detail}</td>
                            <td>${item.img}</td>
                        </tr>`
            $table.append(_html);
        });   
        $("#title").text(newArray.length + '条数据')
    }
});
