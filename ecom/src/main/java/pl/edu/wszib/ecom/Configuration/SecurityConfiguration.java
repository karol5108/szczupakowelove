package pl.edu.wszib.ecom.Configuration;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.method.configuration.EnableMethodSecurity;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;


import java.util.Arrays;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

@Configuration
@EnableWebSecurity
@EnableMethodSecurity
@EnableGlobalMethodSecurity(prePostEnabled = true, jsr250Enabled = true)
public class SecurityConfiguration {
    @Bean
    public AuthenticationManager authenticationManager(AuthenticationConfiguration authenticationConfiguration) throws Exception {
        return authenticationConfiguration.getAuthenticationManager();
    }


//    @Autowired
//    private UserDetailsService userDetailsService;
//    @Bean
//    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
//
//        return  http
//                .authorizeHttpRequests(auth -> auth
//
//                        .requestMatchers("/login").permitAll()
//                        .requestMatchers("/register").permitAll()
//                        .requestMatchers("/products").permitAll()
//                        .requestMatchers("/products/**").permitAll()
//                        .requestMatchers("/products/*").permitAll()
//                        .requestMatchers("/import").permitAll()
//                        /// permits for templates
//                        .requestMatchers("/orders/**").permitAll()
//                        .requestMatchers("/orders/new-order/**").permitAll()
//                        .requestMatchers("/bj.png").permitAll()
//                        .requestMatchers("/bg.png").permitAll()
//                        .requestMatchers("/logo.png").permitAll()
//                        /// permits for game actions
//                        .requestMatchers("/start").hasRole("USER")
//                        .requestMatchers("/get-one-player").hasRole("USER")
//                        .requestMatchers("/new-game").hasRole("USER")
//                        .requestMatchers("/finish-game").hasRole("USER")
//                        /// permits for admin
//                        .requestMatchers("/users").hasRole("ADMIN")
//                        .requestMatchers("/h2-console/**").hasRole("ADMIN")
//
//                        .anyRequest().authenticated()
//                )
//                .userDetailsService(userDetailsService)
//                .headers(headers -> headers.frameOptions().sameOrigin())
//                .formLogin().loginPage("/login")
//                .defaultSuccessUrl("/", true)
//                .permitAll()
//                .and()
////                .oauth2Login(oauth2 -> oauth2
////                        .loginPage("/loginGithub")
////                        .defaultSuccessUrl("/", true)
////                        .permitAll()
////                )
//                .logout(Customizer.withDefaults())
//                .csrf().disable()
//                .build();
//    }

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        http.sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS).and()
                .authorizeHttpRequests(Authorize -> Authorize
                        .requestMatchers("/").permitAll()
                        .requestMatchers("auth/signup").permitAll()
                        .requestMatchers("/auth/users").permitAll()
                        .requestMatchers("auth/signin").permitAll()
                        .requestMatchers("/products/**").permitAll()
                        .requestMatchers("/import").permitAll()
//                        .anyRequest().authenticated()
                        )
                .addFilterBefore(new JwtValidator(), BasicAuthenticationFilter.class)
                .csrf().disable()
                .cors().configurationSource(new CorsConfigurationSource() {
                    @Override
                    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
                        CorsConfiguration cfg = new CorsConfiguration();

                        cfg.setAllowedOrigins(Arrays.asList(
                                "https://szczupakowelove.vercel.app/",
                                "http://localhost:3000/"
                        ));
                        cfg.setAllowedMethods(Collections.singletonList("*"));
                        cfg.setAllowCredentials(true);
                        cfg.setAllowedHeaders(Collections.singletonList("*"));
                        cfg.setExposedHeaders(Arrays.asList(
                                "Authorization"
                        ));
                        cfg.setMaxAge(3600L);

                        return cfg;
                    }
                })
                .and().httpBasic().and().formLogin().successForwardUrl("/products");
        return http.build();
    }

    @Bean
    PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    /// dodanie roli USER dla uzytkownika git
//    @Bean
//    public OAuth2UserService<OAuth2UserRequest, OAuth2User> oauth2UserService() {
//        return new CustomOAuth2UserService();
//    }
//    private static class CustomOAuth2UserService extends DefaultOAuth2UserService {
//
//        @Override
//        public OAuth2User loadUser(OAuth2UserRequest userRequest) throws OAuth2AuthenticationException {
//            OAuth2User user = super.loadUser(userRequest);
//
//            // Tutaj możesz sprawdzić informacje o użytkowniku i nadać mu role
//            Set<GrantedAuthority> authorities = new HashSet<>(user.getAuthorities());
//            System.out.println(user.getName());
//
//
//            authorities.add(new OAuth2UserAuthority("ROLE_USER", user.getAttributes()));
//            System.out.println(authorities);
//
//            return new DefaultOAuth2User(authorities, user.getAttributes(), "login");
//        }
    // }


}
