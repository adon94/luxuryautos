package luxuryautos.service;

import luxuryautos.model.Model;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface ModelService {

    Model view(Long id) throws Exception;
    List<Model> all() throws Exception;
    Model save(Model model) throws Exception;
    boolean remove(Long id) throws Exception;
}
