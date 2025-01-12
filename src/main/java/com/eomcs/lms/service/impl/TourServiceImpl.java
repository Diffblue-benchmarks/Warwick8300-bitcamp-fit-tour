package com.eomcs.lms.service.impl;

import java.util.HashMap;
import java.util.List;
import org.springframework.stereotype.Service;
import com.eomcs.lms.dao.TourDao;
import com.eomcs.lms.domain.Tour;
import com.eomcs.lms.service.TourService;;

// 스프링 IoC 컨테이너가 관리하는 객체 중에서 
// 비즈니스 로직을 담당하는 객체는 
// 특별히 그 역할을 표시하기 위해 @Component 대신에 @Service 애노테이션을 붙인다.
// 이렇게 애노테이션으로 구분해두면 나중에 애노테이션으로 객체를 찾을 수 있다.
@Service
public class TourServiceImpl implements TourService {
  
  TourDao tourDao;
  
  public TourServiceImpl(TourDao tourDao) {
    this.tourDao = tourDao;
  }
  
  // 비지니스 객체에서 메서드 이름은 가능한 업무 용어를 사용한다.
  @Override
  public List<Tour> list(
		  String countryName,
		  String cityName,
		  int pageNo, int pageSize) {
    // 게시물 목록을 가져오는 경우 서비스 객체에서 특별하게 할 일이 없다.
    // 그럼에도 불구하고 Command 객체와 DAO 사이에 Service 객체를 두기로 했으면 
    // 일관성을 위해 Command 객체는 항상 Service 객체를 통해 데이터를 다뤄야 한다.
    // 
    
    HashMap<String,Object> params = new HashMap<>();
    params.put("size", pageSize);
    params.put("rowNo", (pageNo - 1) * pageSize);
    
    if (countryName == null && cityName == null) {
    	return tourDao.findAll(params);
    } else {
    	System.out.println("countryname: " + countryName + "cityname: " + cityName);
    	if (countryName != null) {
    		params.put("countryName", countryName);
    	}
    	if (cityName != null) {
    		params.put("cityName", cityName);
    	}
    	
    	return tourDao.findAll(params);
    }
  }
  
  @Override
  public int add(Tour tour) {
    // 이 메서드도 하는 일이 없다.
    // 그래도 일관된 프로그래밍을 위해 Command 객체는 항상 Service 객체를 경유하여 DAO를 사용해야 한다.
    return tourDao.insert(tour);
  }
  
  @Override
  public Tour get(int no) {
    // 이제 조금 서비스 객체가 뭔가를 하는 구만.
    // Command 객체는 데이터를 조회한 후 조회수를 높이는 것에 대해 신경 쓸 필요가 없어졌다.
    Tour tour = tourDao.findByNo(no);
    return tour;
  }
  
  @Override
  public int update(Tour tour) {
    // 이 메서드도 별로 할 일이 없다.
    // 그냥 DAO를 실행시키고 리턴 값을 그대로 전달한다.
    return tourDao.update(tour);
  }
  
  @Override
  public int delete(int no) {
    // 이 메서드도 그냥 DAO에 명령을 전달하는 일을 한다.
    // 그래도 항상 Command 객체는 이 Service 객체를 통해서 데이터를 처리해야 한다.
    return tourDao.delete(no);
  }
  
  @Override
  public int size() {
    // 전체 게시물의 개수
    return tourDao.countAll();
  }

}







