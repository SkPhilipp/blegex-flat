package com.hileco.blegex.core.repository;

import com.hileco.blegex.core.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserRepository  extends JpaRepository<User, String> {

	public User findByUsername(String username);

}