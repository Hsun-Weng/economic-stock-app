package com.hsun.telegram.bean;

import lombok.Data;

import java.io.Serializable;

@Data
public class Chat implements Serializable {
    private final static long serialVersionUID = 0L;

    private Long id;
    private String type;
    private String firstName;
    private String lastName;
    private String username;
    private String title;
    private Boolean allMembersAreAdministrators;
    private ChatPhoto photo;
    private String description;
    private String inviteLink;
    private Message pinnedMessage;
    private ChatPermissions permissions;
    private Integer slowModeDelay;
    private String stickerSetName;
    private Boolean canSetStickerSet;
}
