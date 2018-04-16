SET ANSI_NULLS ON
GO
SET ANSI_NULLS ON
GO
ALTER PROCEDURE [dbo].[ProcedureWF01]

@TipoConsulta VARCHAR(2),
@NroConsulta VARCHAR(2),
@Variable1 VARCHAR(20),
@Variable2 VARCHAR(20) 

AS
SET NOCOUNT ON;

-- Sample: ProcedureWF01 '[TipoConsulta]','[NroConsulta]','[Variable1]','[Variable2]'
/*
User: Usuario Comprador
C1: Jefe directo del comprador
C2: Subgerente directo del comprador
C3: Administración
C4: Gerente del comprador
C5: Gerente de administración y finanzas
C6: Gerente General
*/
-- var1/var2 (Bien/Servicio) --------------------------------------------------------------
IF @TipoConsulta = '1'
	OR @TipoConsulta = '2'
BEGIN
	IF @NroConsulta = '1'
		SELECT C1 FROM wf01_approval_1 WHERE [User] = @Variable1;

	IF @NroConsulta = '2'
		SELECT C2 FROM wf01_approval_1 WHERE [User] = @Variable1;

	IF @NroConsulta = '3'
		SELECT C3 FROM wf01_approval_1 WHERE [User] = @Variable1;

	IF @NroConsulta = '4'
		SELECT C4 FROM wf01_approval_1 WHERE [User] = @Variable1;

	IF @NroConsulta = '5'
		SELECT C5 FROM wf01_approval_1 WHERE [User] = @Variable1;

	IF @NroConsulta = '6'
		SELECT C6 FROM wf01_approval_1 WHERE [User] = @Variable1;

	IF @NroConsulta = '10'
		SELECT (LTRIM(RTRIM(ProductCode)) + ' - ' + LTRIM(RTRIM(UPPER(ProductDescription)))) AS Producto
			,LTRIM(RTRIM(ProductCode)) AS Codigo
		FROM ListProductos
		WHERE [Type] = @TipoConsulta
			AND (
				ProductCode LIKE '%' + @Variable1 + '%'
				OR ProductDescription LIKE '%' + @Variable1 + '%'
				)

	IF @NroConsulta = '11'
		SELECT (LTRIM(RTRIM(ProviderRUC)) + ' - ' + LTRIM(RTRIM(UPPER(ProviderName)))) AS Proveedor
			,LTRIM(RTRIM(ProviderRUC)) AS RUC
		FROM Proveedores
		WHERE ProviderName LIKE '%' + @Variable1 + '%'
			OR ProviderRUC LIKE '%' + @Variable1 + '%'

	IF @NroConsulta = '12'
		SELECT TOP 1 ltrim(rtrim(ProductDescription)) AS Description
		FROM ListProductos
		WHERE ProductCode = @Variable1
			AND [Type] = @TipoConsulta

	IF @NroConsulta = '13'
		SELECT TOP 1 ltrim(rtrim(ProductVolumen)) AS Unidad
		FROM ListProductos
		WHERE ProductCode = @Variable1
			AND [Type] = @TipoConsulta
END

-- var3 (Tarifario) --------------------------------------------------------------
IF @TipoConsulta = '3'
BEGIN
	IF @NroConsulta = '1'
		SELECT C1 FROM wf01_approval_3 WHERE [User] = @Variable1;

	IF @NroConsulta = '2'
		SELECT C2 FROM wf01_approval_3 WHERE [User] = @Variable1;

	IF @NroConsulta = '3'
		SELECT C3 FROM wf01_approval_3 WHERE [User] = @Variable1;

	IF @NroConsulta = '4'
		SELECT C4 FROM wf01_approval_3 WHERE [User] = @Variable1;
END

----------------------------------------------------------------
IF @TipoConsulta = '10'
BEGIN
	IF @NroConsulta = '1'
	BEGIN
		SELECT Cambio FROM [dbo].[Cambio] WHERE DATE = CONVERT(DATE, GETDATE(), 103)
	END

	IF @NroConsulta = '2'
	BEGIN
		--SELECT ProjectCode ,(LTRIM(RTRIM(ProjectCode)) + ' - ' + LTRIM(RTRIM(ProjectDescription))) AS Proyecto FROM Proyectos
		SELECT ProjectCode ,(LTRIM(RTRIM(ProjectCode)) + ' - ' + LTRIM(RTRIM(ProjectDescription))) AS Proyecto FROM Proyectos
		WHERE (
				ProjectCode LIKE '%' + @Variable1 + '%'
				OR ProjectDescription LIKE '%' + @Variable1 + '%'
				)
	END

	IF @NroConsulta = '3'
	BEGIN
		SELECT Nombre, Usuario FROM Users WHERE Nombre LIKE '%' + @Variable1 + '%' AND @Variable1 <> ''
		ORDER BY Nombre
	END

	IF @NroConsulta = '4'
	BEGIN
		SELECT RuleDetail FROM Reglas WHERE Tipo = 2
		ORDER BY Tipo ASC
	END

	IF @NroConsulta = '5'
	BEGIN
		SELECT RuleDetail FROM Reglas WHERE Tipo = 1
	END

	IF @NroConsulta = '6'
	BEGIN
		SELECT TOP 1 LTRIM(RTRIM(ProviderName)) AS Nombre FROM Proveedores WHERE ProviderRUC = @Variable1
	END

	IF @NroConsulta = '7'
	BEGIN
		SELECT RuleDetail FROM Reglas WHERE Tipo = 3 ORDER BY RuleDetail ASC
	END

	IF @NroConsulta = '8'
	BEGIN
		SELECT Usuario, Nombre FROM [dbo].[Users] WHERE CentroCosto = '1'
	END
	IF @NroConsulta = '9'
	BEGIN
		SELECT 'mzuniga' AS UserDelegate
	END
END
GO