package com.hileco.blegex.server.controller;

import com.hileco.blegex.core.model.User;
import com.hileco.blegex.core.repository.UserRepository;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import javax.inject.Inject;
import javax.validation.Valid;

@RestController
@RequestMapping("/services/users")
public class UserService {

    private final UserRepository userRepository;

    @Inject
    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @RequestMapping(method = RequestMethod.POST)
    public ResponseEntity createUser(@RequestBody @Valid final User user) {
        if(userRepository.findByUsername(user.getUsername()) == null){
            userRepository.save(user);
            return new ResponseEntity(HttpStatus.CREATED);
        }
        else{
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
    }

    @RequestMapping(value = "/verify", method = RequestMethod.POST)
    public ResponseEntity verifyUser(@RequestBody @Valid final User user) {
        User existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser == null){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        if(!existingUser.getPassword().equals(user.getPassword())){
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.OK);
    }

}