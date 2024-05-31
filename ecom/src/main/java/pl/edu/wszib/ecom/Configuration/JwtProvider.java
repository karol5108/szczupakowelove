package pl.edu.wszib.ecom.Configuration;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import javax.crypto.SecretKey;
import java.util.Date;

@Service
public class JwtProvider {
    SecretKey key = Keys.hmacShaKeyFor(JwtConstant.SECRET_KEY.getBytes());
    public String generateToken(Authentication auth){
        String jwt= Jwts.builder()
                .setIssuedAt(new Date())
                .setExpiration(new Date(new Date().getTime()+84600000))
                .claim("email",auth.getName())
                .signWith(key).compact();
        return jwt;
    }

    public String getEmailFromToken(String jwt) {
        try {
//            System.out.println("Received JWT: " + jwt);
//
//            // Assuming the token starts with "Bearer ", remove the prefix
//            jwt = jwt.substring(7);
//
//            System.out.println("JWT after removing prefix: " + jwt);

            Claims claims = Jwts.parserBuilder().setSigningKey(key).build().parseClaimsJws(jwt).getBody();

            String email = String.valueOf(claims.get("email"));

            return email;
        } catch (Exception e) {
            // Log the error or handle it appropriately
            e.printStackTrace(); // Temporary logging for debugging
            return null; // Or throw a custom exception
        }
    }


}
