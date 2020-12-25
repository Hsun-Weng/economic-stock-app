package com.hsun.chat;

import com.google.gson.ExclusionStrategy;
import com.google.gson.FieldAttributes;
import com.google.gson.Gson;
import com.google.gson.GsonBuilder;
import com.google.gson.annotations.Expose;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jackson.JacksonAutoConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import retrofit2.converter.gson.GsonConverterFactory;

@SpringBootApplication(exclude = {JacksonAutoConfiguration.class})
@ComponentScan("com.hsun.chat")
public class ChatBotApplication {

	public static void main(String[] args) {
		SpringApplication.run(ChatBotApplication.class, args);
	}

	@Bean
	public Gson gson() {
		return new GsonBuilder()
				.setDateFormat("yyyy-MM-dd")
				.addSerializationExclusionStrategy(new ExclusionStrategy() {
					@Override
					public boolean shouldSkipField(FieldAttributes fieldAttributes) {
						final Expose expose = fieldAttributes.getAnnotation(Expose.class);
						return expose != null && !expose.serialize();
					}

					@Override
					public boolean shouldSkipClass(Class<?> aClass) {
						return false;
					}
				})
				.addDeserializationExclusionStrategy(new ExclusionStrategy() {
					@Override
					public boolean shouldSkipField(FieldAttributes fieldAttributes) {
						final Expose expose = fieldAttributes.getAnnotation(Expose.class);
						return expose != null && !expose.deserialize();
					}

					@Override
					public boolean shouldSkipClass(Class<?> aClass) {
						return false;
					}
				})
				.create();
	}

	@Bean
	public GsonConverterFactory gsonConverterFactory() {
		return GsonConverterFactory.create(gson());
	}
}