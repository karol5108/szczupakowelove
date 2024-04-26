package pl.edu.wszib.ecom.Model;

import jakarta.persistence.*;
import lombok.Data;
import pl.edu.wszib.ecom.Enum.UserRole;

@Entity
@Data
@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String username;
    private UserRole role;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

}
