package luxuryautos.service.impl;

import luxuryautos.dao.MakeDAO;
import luxuryautos.model.Make;
import luxuryautos.service.MakeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MakeServiceImpl implements MakeService {

    private final MakeDAO makeDAO;

    @Autowired
    public MakeServiceImpl(MakeDAO makeDAO) {
        this.makeDAO = makeDAO;
    }

    @Override
    public Make view(Long id) throws Exception {
        return makeDAO.findOne(id);
    }

    @Override
    public List<Make> all() throws Exception {
        return makeDAO.findAll();
    }

    @Override
    public Make save(Make make) throws Exception {
        return makeDAO.save(make);
    }

    @Override
    public boolean remove(Long id) throws Exception {
        makeDAO.delete(id);
        return makeDAO.exists(id);
    }
}
