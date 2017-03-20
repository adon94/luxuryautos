package luxuryautos.service.impl;

import luxuryautos.dao.ModelDAO;
import luxuryautos.model.Model;
import luxuryautos.service.ModelService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ModelServiceImpl implements ModelService {

    private final ModelDAO modelDAO;

    @Autowired
    public ModelServiceImpl(ModelDAO modelDAO) {
        this.modelDAO = modelDAO;
    }

    @Override
    public Model view(Long id) throws Exception {
        return modelDAO.findOne(id);
    }

    @Override
    public List<Model> all() throws Exception {
        return modelDAO.findAll();
    }

    @Override
    public Model save(Model model) throws Exception {
        return modelDAO.save(model);
    }

    @Override
    public boolean remove(Long id) throws Exception {
        modelDAO.delete(id);
        return modelDAO.exists(id);
    }
}
