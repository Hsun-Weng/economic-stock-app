package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;
import java.util.Arrays;

@Data
public class Poll implements Serializable {
    private final static long serialVersionUID = 0L;

    private String id;
    private String question;
    private PollOption[] options;
    private Integer totalVoterCount;
    private Boolean isClosed;
    private Boolean isAnonymous;
    private String type;
    private Boolean allowsMultipleAnswers;
    private Integer correctOptionId;
    private String explanation;
    private MessageEntity[] explanationEntities;
    private Integer openPeriod;
    private Integer closeDate;
}
