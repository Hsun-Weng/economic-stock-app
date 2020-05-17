package com.hsun.economic.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.http.HttpMethod;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.hsun.economic.filter.JWTAuthenticationFilter;
import com.hsun.economic.filter.JWTAuthorizationFilter;

@EnableWebSecurity
public class WebSecurity extends WebSecurityConfigurerAdapter {
    
    @Autowired
    private UserDetailsService userDetailsService;
    
    @Autowired
    private PasswordEncoder passwordEncoder;
    
    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().authorizeRequests()
        .antMatchers(HttpMethod.POST, "/user/signup").permitAll()
        .antMatchers("/user/**").authenticated()
        .anyRequest().permitAll()
        .and()
        .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS);
        
        JWTAuthenticationFilter jwtAuthenticationFilter = new JWTAuthenticationFilter(authenticationManager());
        jwtAuthenticationFilter.setFilterProcessesUrl("/user/login");
        
        http
        .addFilter(jwtAuthenticationFilter)
        .addFilter(new JWTAuthorizationFilter(authenticationManager()));
    }
    
    @Override
    protected void configure(AuthenticationManagerBuilder auth) throws Exception {
        auth.userDetailsService(userDetailsService).passwordEncoder(passwordEncoder);
    }
    
    @Bean
    public CorsConfigurationSource corsConfiguration() {
        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", new CorsConfiguration().applyPermitDefaultValues());
        return source;
    }
}
