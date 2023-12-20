package com.example.springandreactproject.repository;

import com.example.springandreactproject.model.Student;
import com.example.springandreactproject.response.StudentResponse;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface StudentRepository extends JpaRepository<Student,Long> {

    @Query("""
           select new com.example.springandreactproject.response.StudentResponse(st.id,st.code,st.name,st.age,st.gender,st.birthDay,st.phone,mj.name)
           from Student st,Major mj where st.major.id=mj.id
           """)
    List<StudentResponse> getAll();
}
