package luxuryautos.dao;

import luxuryautos.model.Make;
import org.springframework.data.jpa.repository.JpaRepository;

import javax.transaction.Transactional;

@Transactional
public interface MakeDAO extends JpaRepository<Make, Long> {
}
