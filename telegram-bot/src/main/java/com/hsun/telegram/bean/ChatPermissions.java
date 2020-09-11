package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class ChatPermissions implements Serializable {
    private final static long serialVersionUID = 0L;

    private Boolean canSendMessages;
    private Boolean canSendMediaMessages;
    private Boolean canSendPolls;
    private Boolean canSendOtherMessages;
    private Boolean canAddWebPagePreviews;
    private Boolean canChangeInfo;
    private Boolean canInviteUsers;
    private Boolean canPinMessages;
}
