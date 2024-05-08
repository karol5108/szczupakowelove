package pl.edu.wszib.ecom.Model;

import jakarta.persistence.*;
import lombok.*;
import pl.edu.wszib.ecom.Enum.UserRole;

@Entity
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Data
@Table(name= "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String email;
    private String password;
    private String username;
    private String roles;

    @Lob
    @Column(columnDefinition = "longblob")
    private byte[] img;

}
