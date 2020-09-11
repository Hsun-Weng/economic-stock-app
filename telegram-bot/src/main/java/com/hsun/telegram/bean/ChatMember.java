package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChatMember implements Serializable {
    private final static long serialVersionUID = 0L;

    private User user;
    private String status;

    private String customTitle;
    private Integer untilDate;
    private Boolean canBeEdited;
    private Boolean canPostMessages;
    private Boolean canEditMessages;
    private Boolean canDeleteMessages;
    private Boolean canRestrictMembers;
    private Boolean canPromoteMembers;
    private Boolean canChangeInfo;
    private Boolean canInviteUsers;
    private Boolean canPinMessages;
    private Boolean isMember;
    private Boolean canSendMessages;
    private Boolean canSendMediaMessages;
    private Boolean canSendPolls;
    private Boolean canSendOtherMessages;
    private Boolean canAddWebPagePreviews;
}
