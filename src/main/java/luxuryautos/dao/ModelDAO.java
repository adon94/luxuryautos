package luxuryautos.dao;

import luxuryautos.model.Model;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface ModelDAO extends JpaRepository<Model, Long> {

}
