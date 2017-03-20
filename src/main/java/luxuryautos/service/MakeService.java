package luxuryautos.service;

import luxuryautos.model.Make;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface MakeService {

    Make view(Long id) throws Exception;
    List<Make> all() throws Exception;
    Make save(Make make) throws Exception;
    boolean remove(Long id) throws Exception;
}
