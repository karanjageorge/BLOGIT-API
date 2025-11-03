BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[UserTable] (
    [id] NVARCHAR(1000) NOT NULL,
    [firstName] NVARCHAR(1000) NOT NULL,
    [lastName] NVARCHAR(1000) NOT NULL,
    [emailAddress] NVARCHAR(1000) NOT NULL,
    [userName] NVARCHAR(1000) NOT NULL,
    [password] NVARCHAR(1000) NOT NULL,
    [isDeleted] BIT NOT NULL CONSTRAINT [UserTable_isDeleted_df] DEFAULT 0,
    [datejoined] DATETIME2 NOT NULL CONSTRAINT [UserTable_datejoined_df] DEFAULT CURRENT_TIMESTAMP,
    [lastUpdated] DATETIME2 NOT NULL,
    CONSTRAINT [UserTable_pkey] PRIMARY KEY CLUSTERED ([id]),
    CONSTRAINT [UserTable_emailAddress_key] UNIQUE NONCLUSTERED ([emailAddress]),
    CONSTRAINT [UserTable_userName_key] UNIQUE NONCLUSTERED ([userName])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
