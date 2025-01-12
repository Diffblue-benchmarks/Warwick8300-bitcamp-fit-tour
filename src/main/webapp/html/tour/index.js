var pageNo = 1,
    pageSize = 3,
    tbody = $('tbody'),
    prevPageLi = $('#prevPage'),
    nextPageLi = $('#nextPage'),
    currSpan = $('#currPage > span'),
    crumb = $('#breadcrumb-list'),
    templateSrc = $('#tr-template').html(),
    templateSrc2 = $('#tr-template-for-theme').html();
// script 태그에서 템플릿 데이터를 꺼낸다.


var cityName;
var countryName;
var firstcrumb = crumb.children().eq(0),
    secondcrumb = crumb.children().eq(1),
    thirdcrumb = crumb.children().eq(2);
var temp;

//Handlebars를 통해 템플릿 데이터를 가지고 최종 결과를 생성할 함수를 준비한다.
var trGenerator = Handlebars.compile(templateSrc),
trGenerator2 = Handlebars.compile(templateSrc);


// JSON 형식의 데이터 목록 가져오기
function loadList(pn, countryName, cityName) {
  
  $.getJSON('../../app/json/tour/list?pageNo=' + pn + '&pageSize=' + pageSize + '&countryName=' + countryName + '&cityName=' + cityName, 
    function(obj) {
      // 서버에 받은 데이터 중에서 페이지 번호를 글로벌 변수에 저장한다.
      pageNo = obj.pageNo;
      console.log(obj);
      // TR 태그를 생성하여 테이블 데이터를 갱신한다.
      tbody.html(''); // 이전에 출력한 내용을 제거한다.
      
      // 템플릿 엔진을 실행하여 tr 태그 목록을 생성한다. 그리고 바로 tbody에 붙인다.
      $(trGenerator(obj)).appendTo(tbody);
      
      // 현재 페이지의 번호를 갱신한다.
      currSpan.html(String(pageNo));
      
      // 1페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == 1) {
        prevPageLi.addClass('disabled');
      } else {
        prevPageLi.removeClass('disabled');
      } 
        
      // 마지막 페이지일 경우 버튼을 비활성화 한다.
      if (pageNo == obj.totalPage) {
        nextPageLi.addClass('disabled');
      } else {
        nextPageLi.removeClass('disabled');
      }
      
      // 데이터 로딩이 완료되면 body 태그에 이벤트를 전송한다.
      $(document.body).trigger('loaded-list');
    }); // Bitcamp.getJSON()
  
} // loadList()

$('#prevPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo - 1,'','');
});

$('#nextPage > a').click((e) => {
  e.preventDefault();
  loadList(pageNo + 1,'','');
});

//페이지를 출력한 후 1페이지 목록을 로딩한다.
loadList(1,'', '');

(function() {
  // Dropdowns.
    $('#nav > ul').dropotron({
      mode: 'fade',
      noOpenerFade: true,
      speed: 300,
      alignment: 'center'
    });
})();

function showBreadCrumb(continentName, countryName, cityName) {

    firstcrumb.removeClass('bit-invisible');
    firstcrumb.html(continentName);
    secondcrumb.removeClass('bit-invisible');
    secondcrumb.html(countryName);
    temp = thirdcrumb.detach();
    if(cityName != '') {
      secondcrumb.after(temp);
      thirdcrumb.removeClass('bit-invisible');
      thirdcrumb.html(cityName);
    }
};

// 테이블 목록 가져오기를 완료했으면 제목 a 태그에 클릭 리스너를 등록한다. 
$(document.body).bind('loaded-list', () => {
  // 제목을 클릭했을 때 view.html로 전환시키기
  $('.bit-view-link').click((e) => {
    e.preventDefault();
    window.location.href = 'view.html?no=' + 
      $(e.target).attr('data-no');
  });
});

$(document.body).bind('loaded-list', () => {
  $('.country-list-btn').click((e) => {
    e.preventDefault();
    var continentName = $(e.target).attr('id');
    countryName = $(e.target).html();
    showBreadCrumb(continentName, countryName, '');
    loadList(1, countryName, '');
  });
});



$(document.body).bind('loaded-list', () => {
  $('.city-list-btn').click((e) => {
    e.preventDefault();
    cityName = $(e.target).html();
    var continentName = $(e.target).attr('id').split(',')[0];
    countryName = $(e.target).attr('id').split(',')[1];
    console.log(cityName);
    console.log(countryName);
    console.log (continentName);
    showBreadCrumb(continentName, countryName, cityName);
    loadList(1,'', cityName);
  });
});








