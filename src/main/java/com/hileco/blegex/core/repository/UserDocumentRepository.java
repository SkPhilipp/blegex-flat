package com.hileco.blegex.core.repository;

import com.hileco.blegex.core.model.UserDocument;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Component;

@Component
public interface UserDocumentRepository extends JpaRepository<UserDocument, Integer> {

}