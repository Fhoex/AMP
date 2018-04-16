SET ANSI_NULLS ON
GO
SET ANSI_NULLS ON
GO
ALTER PROCEDURE [dbo].[UserQuery]
(
	@var1 VARCHAR(20),
	@var2 VARCHAR(20),
	@var3 VARCHAR(20)
)AS
BEGIN
DECLARE @SQL VARCHAR(MAX)
	-- var1 (Bien) -------------------------------------------------------------- 
	IF @var1 = '1'
	BEGIN
		IF @var3 ='1'
			SELECT C1 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='2'
			SELECT C2 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='3'
			SELECT C3 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='4'
			SELECT C4 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='5'
			SELECT C5 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='6'
			SELECT C6 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 = '10'
			SET @SQL = 'SELECT (ltrim(rtrim(ProductCode)) + '' - '' + ltrim(rtrim(UPPER(ProductDescription)))) 
			AS Producto, ltrim(rtrim(ProductCode)) AS Codigo FROM ListSBien
			WHERE ProductCode LIKE ''%' + @var2 + '%'' OR ProductDescription LIKE ''%' + @var2 + '%'' '
			EXEC(@SQL)
		IF @var3 = '11'
			SET @SQL ='SELECT (ltrim(rtrim(ProviderRUC)) + '' - '' + ltrim(rtrim(UPPER(ProviderName)))) AS 
			Proveedor, ltrim(rtrim(ProviderRUC)) AS RUC FROM Proveedores
			WHERE ProviderName LIKE ''%' + @var2 + '%'' OR ProviderRUC LIKE ''%' + @var2 + '%'' '
			EXEC(@SQL)
	END
	-- var2 (Servicio) --------------------------------------------------------------  
	IF @var1 = '2'
	BEGIN
		IF @var3 ='1'
			SELECT C1 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='2'
			SELECT C2 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='3'
			SELECT C3 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='4'
			SELECT C4 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='5'
			SELECT C5 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 ='6'
			SELECT C6 FROM wf01_approval_1 WHERE [User] = @var2;
		IF @var3 = '10'
			SET @SQL = 'SELECT (ltrim(rtrim(ProductCode)) + '' - ''+ ltrim(rtrim(UPPER(ProductDescription)))) 
			AS Producto, ltrim(rtrim(ProductCode)) AS Codigo FROM ListSServicio
			WHERE ProductCode LIKE ''%' + @var2 + '%'' OR ProductDescription LIKE ''%' + @var2 + '%'' '
			EXEC(@SQL)
		IF @var3 = '11'
			SET @SQL ='SELECT (ltrim(rtrim(ProviderRUC)) + '' - '' + ltrim(rtrim(UPPER(ProviderName)))) AS 
			Proveedor, ltrim(rtrim(ProviderRUC)) AS RUC FROM Proveedores
			WHERE ProviderName LIKE ''%' + @var2 + '%'' OR ProviderRUC LIKE ''%' + @var2 + '%'' '
			EXEC(@SQL)
	END
	-- var3 (Tarifario) --------------------------------------------------------------  
	IF @var1 = '3'
	BEGIN
		IF @var3 ='1'
			SELECT C1 FROM wf01_approval_3 WHERE [User] = @var2;
		IF @var3 ='2'
			SELECT C2 FROM wf01_approval_3 WHERE [User] = @var2;
		IF @var3 ='3'
			SELECT C3 FROM wf01_approval_3 WHERE [User] = @var2;
		IF @var3 ='4'
			SELECT C4 FROM wf01_approval_3 WHERE [User] = @var2;
		IF @var3 = '10'
			SET @SQL = 'SELECT (ltrim(rtrim(ProductCode)) + '' - ''+ ltrim(rtrim(UPPER(ProductDescription)))) 
			AS Producto, ltrim(rtrim(ProductCode)) AS Codigo FROM ListSServicio
			WHERE ProductCode LIKE ''%' + @var2 + '%'' OR ProductDescription LIKE ''%' + @var2 + '%'' '
			EXEC(@SQL)
		IF @var3 = '11'
			SET @SQL ='SELECT (ltrim(rtrim(ProviderRUC)) + '' - '' + ltrim(rtrim(UPPER(ProviderName)))) AS 
			Proveedor, ltrim(rtrim(ProviderRUC)) AS RUC FROM Proveedores
			WHERE ProviderName LIKE ''%' + @var2 + '%'' OR ProviderRUC LIKE ''%' + @var2 + '%'' '
			EXEC(@SQL)
	END
END
GO